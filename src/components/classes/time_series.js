import { 
    parse,
    eachMonthOfInterval,
    eachYearOfInterval,
    eachWeekOfInterval,
    eachQuarterOfInterval,
    addMonths,
    addYears,
    addWeeks,
    addQuarters
} from 'date-fns'

export const ts_frequency = {
    'yearly' : 1,
    'quarter': 4,
    'monthly': 12,
    'weekly': 52,
}

export default class TimeSeries {
    constructor(data, start, frequency = ts_frequency.monthly, date_format = 'dd/MM/yyyy') {
      this.data = data;
      this.start = start;
      this.frequency = frequency;
      this.date_format = date_format
    }

    size() {
        let size = 0 
        if(this.data.length) {
            let quotient = Math.floor(this.data.length / this.frequency)
            let remainder = this.data.length % this.frequency;
            let quotient_size = !remainder ? quotient : quotient + 1
            size = this.data.length < this.frequency ? 1 : quotient_size
        }
        return size * this.frequency
    }

    create_date_serie() {        
        let amount = this.size() - 1
        let start_date = parse(this.start, this.date_format, new Date())
        
        let each_interval;
        let add;
        if(this.frequency == ts_frequency.monthly) {
            each_interval = eachMonthOfInterval
            add = addMonths
        } 
        else if(this.frequency == ts_frequency.yearly){
            each_interval = eachYearOfInterval
            add = addYears
        }
        else if(this.frequency == ts_frequency.weekly) {
            each_interval = eachWeekOfInterval
            add = addWeeks
        }
        else if(this.frequency == ts_frequency.quarter) {
            each_interval = eachQuarterOfInterval
            add = addQuarters

        }

        return each_interval ({
            start: start_date,
            end: add(start_date, amount)
        })
    }
}
