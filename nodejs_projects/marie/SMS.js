/* Script written by Swen-Peter Ekkebus, edited by Ing. Milan Chudik.
 *
 * Further fixes and functionality by Andrew Alexander:
 * Fix message length issues, handle +xx  & 0xx phone codes, added bit length options,
 * display 8 & 16 bit messages, reformat interface, deal with embedded spaces in hex,
 * allow leading AT command in input, implemented some support for alpanumeric senders...
 *
 * ekkebus[at]cs.utwente.nl
 * Feel free to use it, please don't forget to link to the source ;)
 *
 *
 * www.rednaxela.net - Feel free to use this code as you wish. 
 * Version 1.5 r9aja
 * 
 * Official BPS develop tool
 *
 * (c) BPS & co, 2003
 */


//Array with "The 7 bit defaultalphabet"
sevenbitdefault = new Array('@', '£', '$', '¥', 'è', 'é', 'ù', 'ì', 'ò', 'Ç', '\n', 'Ø', 'ø', '\r', 'Å', 'å', '\u0394', '_', '\u03a6', '\u0393', '\u039b', '\u03a9', '\u03a0', '\u03a8', '\u03a3', '\u0398', '\u039e', '€', 'Æ', 'æ', 'ß', 'É', ' ', '!', '"', '#', '¤', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '¡', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ñ', 'Ü', '§', '¿', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ñ', 'ü', 'à');


// Variable that stores the information to show the user the calculation of the translation
var calculation = "";

var maxkeys = 160;
var alerted = false;



// function te convert a bit string into a integer
function binToInt(x)//sp
{
    var total = 0;
    var power = parseInt(x.length) - 1;




    for (var i = 0; i < x.length; i++)
    {
        if (x.charAt(i) == '1')
        {
            total = total + Math.pow(2, power);
        }
        power--;
    }
    return total;
}




// function to convert a integer into a bit String
function intToBin(x, size) //sp
{
    var base = 2;
    var num = parseInt(x);
    var bin = num.toString(base);
    for (var i = bin.length; i < size; i++)
    {
        bin = "0" + bin;
    }
    return bin;
}




// function to convert a Hexnumber into a 10base number
function HexToNum(numberS)
{
    var tens = MakeNum(numberS.substring(0, 1));

    var ones = 0;
    if (numberS.length > 1) // means two characters entered
        ones = MakeNum(numberS.substring(1, 2));
    if (ones == 'X')
    {
        return "00";
    }
    return  (tens * 16) + (ones * 1);
}




// helper function for HexToNum
function MakeNum(str)
{
    if ((str >= '0') && (str <= '9'))
        return str;
    switch (str.toUpperCase())
    {
        case "A":
            return 10;
        case "B":
            return 11;
        case "C":
            return 12;
        case "D":
            return 13;
        case "E":
            return 14;
        case "F":
            return 15;
        default:
            return 16;
    }
    return 16;
}




//function to convert integer to Hex
function intToHex(i) //sp
{
    var sHex = "0123456789ABCDEF";
    h = "";
    i = parseInt(i);
    for (j = 0; j <= 3; j++)
    {
        h += sHex.charAt((i >> (j * 8 + 4)) & 0x0F) +
                sHex.charAt((i >> (j * 8)) & 0x0F);
    }
    return h.substring(0, 2);
}




function ToHex(i)
{
    var sHex = "0123456789ABCDEF";
    var Out = "";




    Out = sHex.charAt(i & 0xf);
    i >>= 4;
    Out = sHex.charAt(i & 0xf) + Out;




    return Out;
}








function getSevenBit(character) //sp
{
    for (var i = 0; i < sevenbitdefault.length; i++)
    {
        if (sevenbitdefault[i] == character)
        {
            return i;
        }
    }
    alert("No 7 bit char for " + character);
    return 0;
}




function getEightBit(character)
{
    return character;
}




function get16Bit(character)
{
    return character;
}




function phoneNumberMap(character)
{
//	return character;
    if ((character >= '0') && (character <= '9'))
    {
        return character;
    }
    switch (character.toUpperCase())
    {
        case '*':
            return 'A';
        case '#':
            return 'B';
        case 'A':
            return 'C';
        case 'B':
            return 'D';
        case 'C':
            return 'E';
//		case '+':
//			return '+'; // An exception to fit with current processing ...
        default:
            return 'F';
    }
    return 'F';
}




function phoneNumberUnMap(chararacter)
{
    if ((chararacter >= '0') && (chararacter <= '9'))
    {
        return chararacter;
    }
    switch (chararacter)
    {
        case 10:
            return '*';
        case 11:
            return '#';
        case 12:
            return 'A';
        case 13:
            return 'B';
        case 14:
            return 'C';
        default:
            return 'F';
    }
    return 'F';
}




// function to convert semioctets to a string
function semiOctetToString(inp) //sp
{
    var out = "";
    for (var i = 0; i < inp.length; i = i + 2)
    {
        var temp = inp.substring(i, i + 2);
        out = out + phoneNumberMap(temp.charAt(1)) + phoneNumberMap(temp.charAt(0));
    }




    return out;
}

//Main function to translate the input to a "human readable" string
function getUserMessage(input, truelength) // Add truelength AJA
{
    var byteString = "";
    octetArray = new Array();
    restArray = new Array();
    septetsArray = new Array();
    var s = 1;
    var count = 0;
    var matchcount = 0; // AJA
    var smsMessage = "";

    var calculation1 = "<table border=1 ><tr><td align=center width=75><b>Hex</b></td>";
    var calculation2 = "<tr><td align=center width=75> <b>&nbsp;&nbsp;&nbsp;Octets&nbsp;&nbsp;&nbsp;</b></td>";
    var calculation3 = "<table border=1 ><tr><td align=center width=75><b>septets</b></td>";
    var calculation4 = "<tr><td align=center width=75><b>Character</b></td>";
    calculation = "";




    //Cut the input string into pieces of2 (just get the hex octets)
    for (var i = 0; i < input.length; i = i + 2)
    {
        var hex = input.substring(i, i + 2);
        byteString = byteString + intToBin(HexToNum(hex), 8);
        if ((i % 14 == 0 && i != 0))
        {
            calculation1 = calculation1 + "<td align=center width=75>+++++++</td>";
        }
        calculation1 = calculation1 + "<td align=center width=75>" + hex + "</td>";

    }
    calculation1 = calculation1 + "<td align=center width=75>+++++++</td>";

    // make two array's these are nessesery to
    for (var i = 0; i < byteString.length; i = i + 8)
    {
        octetArray[count] = byteString.substring(i, i + 8);
        restArray[count] = octetArray[count].substring(0, (s % 8));
        septetsArray[count] = octetArray[count].substring((s % 8), 8);
        if ((i % 56 == 0 && i != 0))
        {
            calculation2 = calculation2 + "<td align=center width=75>&nbsp;</td>";
        }
        calculation2 = calculation2 + "<td align=center width=75><span style='background-color: #FFFF00'>" + restArray[count] + "</span>" + septetsArray[count] + "</td>";





        s++;
        count++;
        if (s == 8)
        {
            s = 1;
        }
    }
    calculation2 = calculation2 + "<td align=center width=75>&nbsp;</td>";

    // put the right parts of the array's together to make the sectets
    for (var i = 0; i < restArray.length; i++)
    {

        if (i % 7 == 0)
        {
            if (i != 0)
            {
                smsMessage = smsMessage + sevenbitdefault[binToInt(restArray[i - 1])];
                calculation3 = calculation3 + "<td align=center width=75><span style='background-color: #FFFF00'>&nbsp;" + restArray[i - 1] + "</span>&nbsp;</td>";
                calculation4 = calculation4 + "<td align=center width=75>&nbsp;" + sevenbitdefault[binToInt(restArray[i - 1])] + "&nbsp;</td>";
                matchcount++; // AJA
            }
            smsMessage = smsMessage + sevenbitdefault[binToInt(septetsArray[i])];
            calculation3 = calculation3 + "<td align=center width=75>&nbsp;" + septetsArray[i] + "&nbsp;</td>";
            calculation4 = calculation4 + "<td align=center width=75>&nbsp;" + sevenbitdefault[binToInt(septetsArray[i])] + "&nbsp;</td>";
            matchcount++; // AJA
        }
        else
        {
            smsMessage = smsMessage + sevenbitdefault[binToInt(septetsArray[i] + restArray[i - 1])];
            calculation3 = calculation3 + "<td align=center width=75>&nbsp;" + septetsArray[i] + "<span style='background-color: #FFFF00'>" + restArray[i - 1] + "&nbsp;</span>" + "</td>"
            calculation4 = calculation4 + "<td align=center width=75>&nbsp;" + sevenbitdefault[binToInt(septetsArray[i] + restArray[i - 1])] + "&nbsp;</td>";
            matchcount++; // AJA
        }

    }
    if (matchcount != truelength) // Don't forget trailing characters!! AJA
    {
        smsMessage = smsMessage + sevenbitdefault[binToInt(restArray[i - 1])];
        calculation3 = calculation3 + "<td align=center width=75><span style='background-color: #FFFF00'>&nbsp;" + restArray[i - 1] + "</span>&nbsp;</td>";
        calculation4 = calculation4 + "<td align=center width=75>&nbsp;" + sevenbitdefault[binToInt(restArray[i - 1])] + "&nbsp;</td>";
    }
    else // Blank Filler
    {
        calculation3 = calculation3 + "<td align=center width=75>+++++++</td>";
        calculation4 = calculation4 + "<td align=center width=75>&nbsp;</td>";
    }

    //Put all the calculation info together	
    calculation = "Conversion of 8-bit octets to 7-bit default alphabet<br><br>" + calculation1 + "</tr>" + calculation2 + "</tr></table>" + calculation3 + "</tr>" + calculation4 + "</tr></table>";




    return smsMessage;
}

function getUserMessage16(input, truelength)
{
    var smsMessage = "";
    calculation = "Not implemented";




    // Cut the input string into pieces of 4
    for (var i = 0; i < input.length; i = i + 4)
    {
        var hex1 = input.substring(i, i + 2);
        var hex2 = input.substring(i + 2, i + 4);
        smsMessage += "" + String.fromCharCode(HexToNum(hex1) * 256 + HexToNum(hex2));
    }

    return smsMessage;
}

function getUserMessage8(input, truelength)
{
    var smsMessage = "";
    calculation = "Not implemented";




    // Cut the input string into pieces of 2 (just get the hex octets)
    for (var i = 0; i < input.length; i = i + 2)
    {
        var hex = input.substring(i, i + 2);
        smsMessage += "" + String.fromCharCode(HexToNum(hex));
    }

    return smsMessage;
}

//Function to build a popup window with the calculation a information
function showCalculation()
{
    if (calculation.length != 0)
    {
        myWin = open('', '', 'width=600,height=200,resizable=yes,location=no,directories=no,toolbar=no,status=no,scrollbars=yes');
        var b = '<html><head><title>Calculation</title></head><body><center>' + calculation + '</center></body></html>';
        a = myWin.document;
        a.open();
        a.write(b);
        a.close();
    }
}

// Function to get SMSmeta info information from PDU String
function getPDUMetaInfo(inp)
{
    var PDUString = inp;
    var start = 0;
    var out = "";




    // Silently Strip leading AT command
    if (PDUString.substr(0, 2) == "AT")
    {
        for (var i = 0; i < PDUString.length; i++)
        {
            if (PDUString.charCodeAt(i) == 10)
            {
                PDUString = PDUString.substr(i + 1);
                break;
            }
        }
    }




    // Silently strip whitespace
    var NewPDU = "";
    for (var i = 0; i < PDUString.length; i++)
    {
        if (MakeNum(PDUString.substr(i, 1)) != 16)
        {
            NewPDU = NewPDU + PDUString.substr(i, 1);
        }
    }
    PDUString = NewPDU;




    var SMSC_lengthInfo = HexToNum(PDUString.substring(0, 2));
    var SMSC_info = PDUString.substring(2, 2 + (SMSC_lengthInfo * 2));
    var SMSC_TypeOfAddress = SMSC_info.substring(0, 2);
    var SMSC_Number = SMSC_info.substring(2, 2 + (SMSC_lengthInfo * 2));




    if (SMSC_lengthInfo != 0)
    {
        SMSC_Number = semiOctetToString(SMSC_Number);

        // if the length is odd remove the trailing  F
        if ((SMSC_Number.substr(SMSC_Number.length - 1, 1) == 'F') || (SMSC_Number.substr(SMSC_Number.length - 1, 1) == 'f'))
        {
            SMSC_Number = SMSC_Number.substring(0, SMSC_Number.length - 1);
        }
        if (SMSC_TypeOfAddress == 91)
        {
            SMSC_Number = "+" + SMSC_Number;
        }
    }

    var start_SMSDeleivery = (SMSC_lengthInfo * 2) + 2;




    start = start_SMSDeleivery;
    var firstOctet_SMSDeliver = PDUString.substr(start, 2);
    start = start + 2;
    if ((HexToNum(firstOctet_SMSDeliver) & 0x20) == 0x20)
    {
        out += "Receipt requested\n";
    }
    var DataHeader = 0;
    if ((HexToNum(firstOctet_SMSDeliver) & 0x40) == 0x40)
    {
        DataHeader = 1;
        out += "Data Header\n";
    }




//	bit1	bit0	Message type
//	0	0	SMS DELIVER (in the direction SC to MS)	
//	0	0	SMS DELIVER REPORT (in the direction MS to SC)	
//	1	0	SMS STATUS REPORT (in the direction SC to MS)		
//	1	0	SMS COMMAND (in the direction MS to SC)	
//	0	1	SMS SUBMIT (in the direction MS to SC)	
//	0	1	SMS SUBMIT REPORT (in the direction SC to MS)	
//	1	1	Reserved




// This needs tidying up!! AJA




    if ((HexToNum(firstOctet_SMSDeliver) & 0x03) == 1 || (HexToNum(firstOctet_SMSDeliver) & 0x03) == 3) // Transmit Message
    {
        if ((HexToNum(firstOctet_SMSDeliver) & 0x03) == 3)
        {
            out = "Unknown Message\nTreat as Deliver\n";
        }
        var MessageReference = HexToNum(PDUString.substr(start, 2));
        start = start + 2;




        // length in decimals
        var sender_addressLength = HexToNum(PDUString.substr(start, 2));
        if (sender_addressLength % 2 != 0)
        {
            sender_addressLength += 1;
        }
        start = start + 2;




        var sender_typeOfAddress = PDUString.substr(start, 2);
        start = start + 2




        var sender_number = semiOctetToString(PDUString.substring(start, start + sender_addressLength));




        if ((sender_number.substr(sender_number.length - 1, 1) == 'F') || (sender_number.substr(sender_number.length - 1, 1) == 'f'))
        {
            sender_number = sender_number.substring(0, sender_number.length - 1);
        }
        if (sender_typeOfAddress == 91)
        {
            sender_number = "+" + sender_number;
        }
        start += sender_addressLength;




        var tp_PID = PDUString.substr(start, 2);
        start += 2;




        var tp_DCS = PDUString.substr(start, 2);
        var tp_DCS_desc = tpDCSMeaning(tp_DCS);
        start += 2;




        var ValidityPeriod;
        switch ((HexToNum(firstOctet_SMSDeliver) & 0x18))
        {
            case 0: // Not Present
                ValidityPeriod = "Not Present";
                break;
            case 0x10: // Relative
                ValidityPeriod = "Rel " + cValid(HexToNum(PDUString.substr(start, 2)));
                start += 2;
                break;
            case 0x08: // Enhanced
                ValidityPeriod = "Enhanced - Not Decoded";
                start += 14;
                break;
            case 0x18: // Absolute
                ValidityPeriod = "Absolute - Not Decoded";
                start += 14;
                break;
        }




// Commonish...
        var messageLength = HexToNum(PDUString.substr(start, 2));

        start += 2;

        var bitSize = DCS_Bits(tp_DCS);
        var userData = "Undefined format";
        if (bitSize == 7)
        {
            userData = getUserMessage(PDUString.substr(start, PDUString.length - start), messageLength);
        }
        else if (bitSize == 8)
        {
            userData = getUserMessage8(PDUString.substr(start, PDUString.length - start), messageLength);
        }
        else if (bitSize == 16)
        {
            userData = getUserMessage16(PDUString.substr(start, PDUString.length - start), messageLength);
        }




        userData = userData.substr(0, messageLength);
        if (bitSize == 16)
        {
            messageLength /= 2;
        }




        out += "SMSC#" + SMSC_Number + "\nReceipient:" + sender_number + "\nValidity:" + ValidityPeriod + "\nTP_PID:" + tp_PID + "\nTP_DCS:" + tp_DCS + "\nTP_DCS-popis:" + tp_DCS_desc + "\n" + userData + "\nLength:" + messageLength;
    }
    else // Receive Message
    if ((HexToNum(firstOctet_SMSDeliver) & 0x03) == 0) // Receive Message
    {
        // length in decimals
        var sender_addressLength = HexToNum(PDUString.substr(start, 2));




        start = start + 2;




        var sender_typeOfAddress = PDUString.substr(start, 2);
        start = start + 2




        var sender_number;
        if (sender_typeOfAddress == "D0")
        {
            _sl = sender_addressLength;




            if (sender_addressLength % 2 != 0)
            {
                sender_addressLength += 1;
            }




//alert(sender_addressLength);
//alert(_sl);




//alert(parseInt(sender_addressLength/2*8/7));
//alert(parseInt(_sl/2*8/7));




//alert(PDUString.substring(start,start+sender_addressLength));
//alert(PDUString.substring(start,start+_sl));




//			sender_number = getUserMessage(PDUString.substring(start,start+sender_addressLength),parseInt(sender_addressLength/2*8/7));
            sender_number = getUserMessage(PDUString.substring(start, start + sender_addressLength), parseInt(_sl / 2 * 8 / 7));
//alert(sender_number);
        }
        else
        {




            if (sender_addressLength % 2 != 0)
            {
                sender_addressLength += 1;
            }




            sender_number = semiOctetToString(PDUString.substring(start, start + sender_addressLength));

            if ((sender_number.substr(sender_number.length - 1, 1) == 'F') || (sender_number.substr(sender_number.length - 1, 1) == 'f'))
            {
                sender_number = sender_number.substring(0, sender_number.length - 1);
            }
            if (sender_typeOfAddress == 91)
            {
                sender_number = "+" + sender_number;
            }
        }
        start += sender_addressLength;




        var tp_PID = PDUString.substr(start, 2);
        start += 2;




        var tp_DCS = PDUString.substr(start, 2);
        var tp_DCS_desc = tpDCSMeaning(tp_DCS);
        start += 2;




        var timeStamp = semiOctetToString(PDUString.substr(start, 14));

        // get date	
        var year = timeStamp.substring(0, 2);
        var month = timeStamp.substring(2, 4);
        var day = timeStamp.substring(4, 6);
        var hours = timeStamp.substring(6, 8);
        var minutes = timeStamp.substring(8, 10);
        var seconds = timeStamp.substring(10, 12);




        timeStamp = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " GMT ?"; //+" + timezone/4;




        /*
         var timezone = MakeNum(timeStamp.substring(12,13)); // timeStamp.substring(12,14);
         if (timezone >= 8)
         {
         timezone -= 8;
         timezone = timezone + timeStamp.substring(13,14); // Concats :: yeuck
         timezone = -timezone;
         timeStamp += "-";
         
         
         
         
         }
         else
         {
         timezone = timezone + timeStamp.substring(13,14); // Concats :: yeuck
         timeStamp += "+";
         }
         
         timeStamp += timezone/4;
         */
        start += 14;




// Commonish...
        var messageLength = HexToNum(PDUString.substr(start, 2));
        start += 2;




        var bitSize = DCS_Bits(tp_DCS);
        var userData = "Undefined format";
        if (bitSize == 7)
        {
            userData = getUserMessage(PDUString.substr(start, PDUString.length - start), messageLength);
        }
        else if (bitSize == 8)
        {
            userData = getUserMessage8(PDUString.substr(start, PDUString.length - start), messageLength);
        }
        else if (bitSize == 16)
        {
            userData = getUserMessage16(PDUString.substr(start, PDUString.length - start), messageLength);
        }




        userData = userData.substr(0, messageLength);




        if (bitSize == 16)
        {
            messageLength /= 2;
        }

        out += "SMSC#" + SMSC_Number + "\nSender:" + sender_number + "\nTimeStamp:" + timeStamp + "\nTP_PID:" + tp_PID + "\nTP_DCS:" + tp_DCS + "\nTP_DCS-popis:" + tp_DCS_desc + "\n" + userData + "\nLength:" + messageLength;
    }
    else
    {
        out = "Status Report\n";




        var MessageReference = HexToNum(PDUString.substr(start, 2)); // ??? Correct this name
        start = start + 2;




        // length in decimals
        var sender_addressLength = HexToNum(PDUString.substr(start, 2));
        if (sender_addressLength % 2 != 0)
        {
            sender_addressLength += 1;
        }
        start = start + 2;




        var sender_typeOfAddress = PDUString.substr(start, 2);
        start = start + 2




        var sender_number = semiOctetToString(PDUString.substring(start, start + sender_addressLength));

        if ((sender_number.substr(sender_number.length - 1, 1) == 'F') || (sender_number.substr(sender_number.length - 1, 1) == 'f'))
        {
            sender_number = sender_number.substring(0, sender_number.length - 1);
        }
        if (sender_typeOfAddress == 91)
        {
            sender_number = "+" + sender_number;
        }
        start += sender_addressLength;




        var timeStamp = semiOctetToString(PDUString.substr(start, 14));

        // get date	
        var year = timeStamp.substring(0, 2);
        var month = timeStamp.substring(2, 4);
        var day = timeStamp.substring(4, 6);
        var hours = timeStamp.substring(6, 8);
        var minutes = timeStamp.substring(8, 10);
        var seconds = timeStamp.substring(10, 12);
        var timezone = timeStamp.substring(12, 14);

        timeStamp = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " GMT +" + timezone / 4;
        start += 14;




        var timeStamp2 = semiOctetToString(PDUString.substr(start, 14));

        // get date	
        var year2 = timeStamp2.substring(0, 2);
        var month2 = timeStamp2.substring(2, 4);
        var day2 = timeStamp2.substring(4, 6);
        var hours2 = timeStamp2.substring(6, 8);
        var minutes2 = timeStamp2.substring(8, 10);
        var seconds2 = timeStamp2.substring(10, 12);
        var timezone2 = timeStamp.substring(12, 14);

        timeStamp2 = day2 + "/" + month2 + "/" + year2 + " " + hours2 + ":" + minutes2 + ":" + seconds2 + " GMT +" + timezone2 / 4;
        start += 14;




        var mStatus = PDUString.substr(start, 2);




        out += "SMSC#\n" + SMSC_Number + "\nSender:\n" + sender_number + "\nMessage Ref#:\n" + MessageReference + "\nTimeStamp:\n" + timeStamp + "\nTimeStamp2:\n" + timeStamp2 + "\nStatus Byte: " + mStatus;
    }

    return out;
}




// function that print the default alphabet to a String
function printDefaultAlphabet()
{
    var out = "";
    out = "<table border=1 cellpadding=0 cellspacing=0 width=300>";
    out = out + "<tr><td align=center>#</td><td align=center>character</td><td align=center>ASCII Code</td><td align=center>bits</td></tr>";
    for (var i = 0; i < sevenbitdefault.length; i++)
    {
        out = out + "<tr><td align=center>" + i + "</td><td align=center>" + sevenbitdefault[i] + "&nbsp;</td><td align=center>" + sevenbitdefault[i].charCodeAt(0) + "</td><td align=center>" + intToBin(sevenbitdefault[i].charCodeAt(0), 8) + "</td></tr>";

    }
    out = out + "</table>";
    return out;
}




// function to make a new window
function show(title, text)
{
    myWin = open('', '', 'width=350,height=500,resizable=no,location=no,directories=no,toolbar=no,status=no,scrollbars=yes');




    var b = '<html><head><title>' + title + '</title></head><body><center>' + text + '</center></body></html>';
    a = myWin.document;
    a.open();
    a.write(b);
    a.close();
}




function stringToPDU(inpString, phoneNumber, smscNumber, size, mclass, valid, receipt) // AJA fixed SMSC processing
{
    var bitSize = size[0].value * size[0].checked | size[1].value * size[1].checked | size[2].value * size[2].checked;




    var octetFirst = "";
    var octetSecond = "";
    var output = "";




    //Make header
    var SMSC_INFO_LENGTH = 0;
    var SMSC_LENGTH = 0;
    var SMSC_NUMBER_FORMAT = "";
    var SMSC = "";
    if (smscNumber != 0)
    {
        SMSC_NUMBER_FORMAT = "81"; // national




        if (smscNumber.substr(0, 1) == '+')
        {
            SMSC_NUMBER_FORMAT = "91"; // international
            smscNumber = smscNumber.substr(1);
        }
        else if (smscNumber.substr(0, 1) != '0')
        {
            SMSC_NUMBER_FORMAT = "91"; // international
        }




        if (smscNumber.length % 2 != 0)
        {
            // add trailing F
            smscNumber += "F";
        }

        SMSC = semiOctetToString(smscNumber);
        SMSC_INFO_LENGTH = ((SMSC_NUMBER_FORMAT + "" + SMSC).length) / 2;
        SMSC_LENGTH = SMSC_INFO_LENGTH;

    }
    if (SMSC_INFO_LENGTH < 10)
    {
        SMSC_INFO_LENGTH = "0" + SMSC_INFO_LENGTH;
    }
    var firstOctet; // = "1100";

    if (receipt.checked)
    {
        if (document.pduToStringForm.vFlag.checked)
        {
            firstOctet = "3100"; // 18 is mask for validity period // 10 indicates relative
        }
        else
        {
            firstOctet = "2100";
        }




    }
    else
    {
        if (document.pduToStringForm.vFlag.checked)
        {
            firstOctet = "1100";
        }
        else
        {
            firstOctet = "0100";
        }
    }

    var REIVER_NUMBER_FORMAT = "81"; // national
    if (phoneNumber.substr(0, 1) == '+')
    {
        REIVER_NUMBER_FORMAT = "91"; // international
        phoneNumber = phoneNumber.substr(1); //,phoneNumber.length-1);
    }
    else if (phoneNumber.substr(0, 1) != '0')
    {
        REIVER_NUMBER_FORMAT = "91"; // international
    }




    var REIVER_NUMBER_LENGTH = intToHex(phoneNumber.length);




    if (phoneNumber.length % 2 != 0)
    {
        // add trailing F
        phoneNumber += "F";
    }




    var REIVER_NUMBER = semiOctetToString(phoneNumber);
    var PROTO_ID = "00";
    var DCS = 0;
    if (mclass != -1) // AJA
    {
        DCS = mclass | 0x10;
    }
    switch (bitSize)
    {
        case 7:
            break;
        case 8:
            DCS = DCS | 4;
            break;
        case 16:
            DCS = DCS | 8;
            break;
    }
    var DATA_ENCODING = intToHex(DCS);
//	var DATA_ENCODING = "00"; // Default
//	if (bitSize == 8)
//	{
//		DATA_ENCODING = "04";
//	}
//	else if (bitSize == 16)
//	{
//		DATA_ENCODING = "08";
//	}




    var VALID_PERIOD = ""; // AA
    if (document.pduToStringForm.vFlag.checked)
    {
        VALID_PERIOD = intToHex(valid); // AA
    }
    var userDataSize;
    if (bitSize == 7)
    {
        userDataSize = intToHex(inpString.length);




        for (var i = 0; i <= inpString.length; i++)
        {
            if (i == inpString.length)
            {
                if (octetSecond != "") // AJA Fix overshoot
                {
                    output = output + "" + (intToHex(binToInt(octetSecond)));
                }
                break;
            }
            var current = intToBin(getSevenBit(inpString.charAt(i)), 7);

            var currentOctet;
            if (i != 0 && i % 8 != 0)
            {
                octetFirst = current.substring(7 - (i) % 8);
                currentOctet = octetFirst + octetSecond;	//put octet parts together

                output = output + "" + (intToHex(binToInt(currentOctet)));
                octetSecond = current.substring(0, 7 - (i) % 8);	//set net second octet
            }
            else
            {
                octetSecond = current.substring(0, 7 - (i) % 8);
            }
        }
    }
    else if (bitSize == 8)
    {
        userDataSize = intToHex(inpString.length);




        var CurrentByte = 0;
        for (var i = 0; i < inpString.length; i++)
        {
            CurrentByte = getEightBit(inpString.charCodeAt(i));
            output = output + "" + (ToHex(CurrentByte));
        }
    }
    else if (bitSize == 16)
    {
        userDataSize = intToHex(inpString.length * 2);




        var myChar = 0;
        for (var i = 0; i < inpString.length; i++)
        {
            myChar = get16Bit(inpString.charCodeAt(i));
            output = output + "" + (ToHex((myChar & 0xff00) >> 8)) + (ToHex(myChar & 0xff));
        }
    }
    var header = SMSC_INFO_LENGTH + SMSC_NUMBER_FORMAT + SMSC + firstOctet + REIVER_NUMBER_LENGTH + REIVER_NUMBER_FORMAT + REIVER_NUMBER + PROTO_ID + DATA_ENCODING + VALID_PERIOD + userDataSize;




    var PDU = header + output;




    var AT = "AT+CMGS=" + (PDU.length / 2 - SMSC_LENGTH - 1); // Add /2 for PDU length AJA - I think the SMSC information should also be excluded








//	var bStep=18;
//	for(var breakUp=1;breakUp*bStep < PDU.length;breakUp++)
//	{
//		PDU = PDU.substr(0,breakUp*bStep+breakUp-1) + " " + PDU.substr(breakUp*bStep+breakUp-1); 
//	}




    //CMGW
    return AT + "\n" + PDU;
}




function change(what)
{
    var keysSoFar = what.value.length;




    if (keysSoFar > maxkeys)
    {
        if (!alerted)
        {
            alert('Max length ' + maxkeys + '!');
        }
        what.value = what.value.substring(0, maxkeys); //chop
        alerted = true;
        keysSoFar = maxkeys;
    }
    window.status = "Characters left : " + (maxkeys - keysSoFar);
}




function DCS_Bits(tp_DCS)
{
    var AlphabetSize = 7; // Set Default
//alert(tp_DCS);
    var pomDCS = HexToNum(tp_DCS);
//alert(pomDCS);
    switch (pomDCS & 192)
    {
        case 0:
            if (pomDCS & 32)
            {
                // tp_DCS_desc="Compressed Text\n";
            }
            else
            {
                // tp_DCS_desc="Uncompressed Text\n";
            }
            switch (pomDCS & 12)
            {
                case 4:
                    AlphabetSize = 8;
                    break;
                case 8:
                    AlphabetSize = 16;
                    break;
            }
            break;
        case 192:
            switch (pomDCS & 0x30)
            {
                case 0x20:
                    AlphabetSize = 16;
                    break;
                case 0x30:
                    if (pomDCS & 0x4)
                    {
                        ;
                    }
                    else
                    {
                        AlphabetSize = 8;
                    }
                    break;
            }
            break;

    }




    return(AlphabetSize);
}




function tpDCSMeaning(tp_DCS)
{
    var tp_DCS_desc = tp_DCS;
    var pomDCS = HexToNum(tp_DCS);
    switch (pomDCS & 192)
    {
        case 0:
            if (pomDCS & 32)
            {
                tp_DCS_desc = "Compressed Text\n";
            }
            else
            {
                tp_DCS_desc = "Uncompressed Text\n";
            }
            if (!(pomDCS & 16)) // AJA
            {
                tp_DCS_desc += "No class\n";
            }
            else
            {
                tp_DCS_desc += "class:";




                switch (pomDCS & 3)
                {
                    case 0:
                        tp_DCS_desc += "0\n";
                        break;
                    case 1:
                        tp_DCS_desc += "1\n";
                        break;
                    case 2:
                        tp_DCS_desc += "2\n";
                        break;
                    case 3:
                        tp_DCS_desc += "3\n";
                        break;
                }
            }
            tp_DCS_desc += "Alphabet:";
            switch (pomDCS & 12)
            {
                case 0:
                    tp_DCS_desc += "Default\n";
                    break;
                case 4:
                    tp_DCS_desc += "8bit\n";
                    break;
                case 8:
                    tp_DCS_desc += "UCS2(16)bit\n";
                    break;
                case 12:
                    tp_DCS_desc += "Reserved\n";
                    break;
            }
            break;
        case 64:
        case 128:
            tp_DCS_desc = "Reserved coding group\n";
            break;
        case 192:
            switch (pomDCS & 0x30)
            {
                case 0:
                    tp_DCS_desc = "Message waiting group\n";
                    tp_DCS_desc += "Discard\n";
                    break;
                case 0x10:
                    tp_DCS_desc = "Message waiting group\n";
                    tp_DCS_desc += "Store Message. Default Alphabet\n";
                    break;
                case 0x20:
                    tp_DCS_desc = "Message waiting group\n";
                    tp_DCS_desc += "Store Message. UCS2 Alphabet\n";
                    break;
                case 0x30:
                    tp_DCS_desc = "Data coding message class\n";
                    if (pomDCS & 0x4)
                    {
                        tp_DCS_desc += "Default Alphabet\n";
                    }
                    else
                    {
                        tp_DCS_desc += "8 bit Alphabet\n";
                    }
                    break;
            }
            break;

    }




    //alert(tp_DCS.valueOf());

    return(tp_DCS_desc);
}




function checkFlag(valid)
{
    if (valid.checked)
    {
        document.pduToStringForm.valid.disabled = false;
        document.pduToStringForm.valid.value = "170";
        document.getElementById('validy').innerHTML = cValid("170");
    }
    else
    {
        document.pduToStringForm.valid.disabled = true;
        document.pduToStringForm.valid.value = "";
        document.getElementById('validy').innerHTML = "";
    }
}




function Validity(valid)
{
    var byValidityPeriod = 0;




    if (isNaN(parseInt(valid)))
    {
        valid = 0;
        document.pduToStringForm.valid.value = valid;
    }
    else
    {
        valid = parseInt(valid);
        if (valid < 0)
        {
            valid = 0;
            document.pduToStringForm.valid.value = valid;
        }
        if (valid > 255)
        {
            valid = 255;
            document.pduToStringForm.valid.value = valid;
        }
    }
    return cValid(valid);
}




function cValid(valid)
{
    var value, out = "";
//	if (isNaN(parseInt(valid)))
//	{
//		alert("No text please we're British!");
//	}
    valid = parseInt(valid);
    if (valid <= 143)
    {
        value = (valid + 1) * 5; // Minutes
    }
    else if (valid <= 167)
    {
        value = ((valid - 143) / 2 + 12); // Hours
        value *= 60; // Convert to Minutes
    }
    else if (valid <= 196)
    {
        value = valid - 166; // days
        value *= 60 * 24; // Convert to Minutes
    }
    else
    {
        value = valid - 192; // Weeks
        value *= 7 * 60 * 24; // Convert to Minutes
    }
    var mins, hours, days, weeks;




    mins = value % 60;
    hours = value / 60;
    days = hours / 24;
    weeks = days / 7;
    hours %= 24;
    days %= 7;




    if (parseInt(weeks) != 0)
    {
        out += parseInt(weeks) + "w ";
    }




    if (parseInt(days) != 0)
    {
        out += parseInt(days) + "d ";
    }




    if (parseInt(hours) != 0)
    {
        out += parseInt(hours) + "h ";
    }
    if (mins != 0)
    {
        out += mins + "m ";
    }




    return out;
}



