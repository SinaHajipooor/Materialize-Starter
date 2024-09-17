import { format } from 'date-fns'
import jalaliMoment from 'jalali-moment'


export function convertPersianToGregorian(persianDate: any) {
    if (persianDate) {
        // Map Persian digits to Latin digits
        const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
        const latinDigits = '0123456789';
        const convertToLatin = (char: any) => latinDigits[persianDigits.indexOf(char)];

        // Replace Persian digits with Latin digits
        const convertedString = persianDate.replace(/[۰-۹]/g, convertToLatin);

        // Split the date parts
        const year = convertedString.slice(0, 4);
        const month = convertedString.slice(4, 6);
        const day = convertedString.slice(6, 8);

        // Convert to integers
        const jalaliYear = parseInt(year, 10);
        const jalaliMonth = parseInt(month, 10);
        const jalaliDay = parseInt(day, 10);

        // Convert to Gregorian
        const gregorianDate = new Date(jalaliYear, jalaliMonth - 1, jalaliDay);

        // Format as 'YYYY-MM-DD'
        const formattedDate = gregorianDate.toISOString().slice(0, 10);

        return formattedDate;
    } else {
        return null;
    }
}

export function convertPersianToEnglishDigits(text: any) {
    if (text) {
        // Define a map object for mapping Persian and Arabic digits to English digits
        const mapping: any = {
            '۰': '0',
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '٠': '0',
            '١': '1',
            '٢': '2',
            '٣': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '٨': '8',
            '٩': '9',
        };

        // Replace Persian and Arabic digits with English digits
        return text.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (match: any) => mapping[match]);
    } else {
        return null;
    }
}

export function getCurrentJalaliYear() {
    // Get the current date
    const currentDate = new Date();

    // Convert the current date to Jalali
    const jalaliDate = jalaliMoment(currentDate);

    // Retrieve the Jalali year
    const jalaliYear = jalaliDate.format('jYYYY');

    return jalaliYear;
}

export function dateConverter(date: any): string | null {
    // Check if the date is already in Jalali format
    const isJalali = /^1[3-9]\d{2}\/\d{1,2}\/\d{1,2}$/.test(date);

    if (isJalali) {
        // If the date is already in Jalali format, return it as is
        return date;
    }

    // If the date is not in Jalali format, convert it
    const formattedGregorianDate = date ? format(new Date(date), 'yyyy/MM/dd') : null;
    const formattedJalaliDate = formattedGregorianDate
        ? jalaliMoment(formattedGregorianDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
        : null;

    return formattedJalaliDate;
}

export function dateTimeConverter(dateTime: any): string | null {

    if (!dateTime) {
        return null
    }

    // Parse the input date string
    const parsedDate = new Date(dateTime);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
        return null; // Return null for invalid input
    }

    // Convert the date to Jalali format
    const formattedJalaliDate = jalaliMoment(parsedDate).locale('fa').format('YYYY/MM/DD');

    // Extract the time part from the original date string
    const timePart = format(parsedDate, 'HH:mm');

    // Combine the Jalali date and time
    const formattedJalaliDateTime = `${formattedJalaliDate} ${timePart}`;

    return formattedJalaliDateTime;
}