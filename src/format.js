// I wanted to try this on my own. Could've used date-fns

class DateFormat {

    static DAYS = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    static MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    /** @param {number} num  */
    static #addOrdinal(num) {
        const PREFIXES = new Map([
            ['1', 'st'],
            ['2', 'nd'],
            ['3', 'rd']
        ]
        );

        
        const lastDigit = num.toString().at(-1);
        const prefixed = PREFIXES.has(lastDigit) ? `${num}${PREFIXES.get(lastDigit)}` : `${num}th`;
        
        return prefixed;
    }

    /** @param {Date} dateObj  */
    static formatDueDate(dateObj) {
        return `${this.MONTHS[dateObj.getMonth()]} ${this.#addOrdinal(dateObj.getDate())}, ${dateObj.getFullYear()} (${this.DAYS[dateObj.getDay()]})`;
    }

}

export { DateFormat };