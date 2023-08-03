import { 
    format as fns_format,
    parse as fns_parse,
    min as fns_min,
    max as fns_max,
    eachMonthOfInterval,
    eachYearOfInterval,
    eachWeekOfInterval,
    eachQuarterOfInterval,
    addMonths,
    addYears,
    addWeeks,
    addQuarters,
    differenceInCalendarMonths,
    compareAsc,
} from 'date-fns'

import { TIME_SERIES_DATE_FORMAT } from '@/assets/files/consts'

export class TimeSeriesError{  
    constructor(code, message) {
      this.name = code || 'Erro'
      this.message = message || 'Ocorreu um erro relacionado com a Série Teporal';
      this.stack = (new Error()).stack;
    }
  }

export class ValidationTimeSerie{
    constructor(ts, minimum_size = 12, maximum_size = 36) {
        this.ts = ts
        this.minimum_size = minimum_size
        this.maximum_size = maximum_size
    }

    get_minimum_size() {
        return this.minimum_size
    }

    get_maximum_size() {
        return this.maximum_size
    }

    set_minimum_size(value) {
        this.minimum_size = value
    }

    set_maximum_size(value) {
        this.maximum_size = value
    }

    valid_min_size() {
        return this.ts.size() >= this.minimum_size
    }

    valid_max_size() {
        return this.ts.size() <= this.maximum_size
    }

    valid_ideal_size(){
        return this.ideal_size() == this.ts.size()
    }

    ideal_size() {
        let size = 0 
        if(this.ts.size()) {
            let quotient = Math.floor(this.ts.size() / this.ts.get_frequency())
            let remainder = this.ts.size() % this.ts.get_frequency();
            let quotient_size = !remainder ? quotient : quotient + 1
            size = this.ts.size() < this.ts.get_frequency() ? 1 : quotient_size
        }
        return size * this.ts.get_frequency()
    }

    is_correct_size(){
        return this.valid_min_size() && this.valid_max_size() && this.valid_ideal_size()
    }

    isDateSequence() {
        this.ts.sort()
        const dt = this.ts.get_data()
        let index_out = []
        for (let i = 0; i < this.ts.size() - 1; i ++) {
          let diff = differenceInCalendarMonths(dt[i+1].date, dt[i].date)
          if(!(diff === 1 || diff === -1)) {
            index_out.push(i + 1)
          }
        }
        return index_out
    }

    hasDuplicatesDates() {
        const dt = this.ts.toString()
        const distinct = new Set(dt.map(i => i.date));     
        const filtered = dt.filter(item => {
            if (distinct.has(item.date)) {                                    
              distinct.delete(item.date);
            }
            else {                
                return true;
            }
        });
        return [...new Set(filtered)]
    }
}

export class TimeSeries {
    constructor(data, start, frequency = ts_frequency.monthly, date_format = TIME_SERIES_DATE_FORMAT) {
        this.date_format = date_format
        this.data = data.map(item => Object.assign({}, item))
        this.start = start
        this.frequency = frequency;

        this.parse()
    }

    parse() {        
        this.data.forEach(item => {
            if(typeof item.date === 'string') {
                item.date = fns_parse(item.date, this.date_format, new Date())
            }
        })
    }

    toString() {
        return this.get_data().map(item => {
            if(typeof item.date !== 'string') {
                item.date = fns_format(item.date, this.date_format)                
            }
            return item
        })
    }

    sort() {
        this.data.sort((a, b) => compareAsc(a.date, b.date))
    }

    get_data() {
        return this.data.map(item => Object.assign({}, item))
    }

    get_dates(){
        return this.data.map(item => item.date)
    }

    get_frequency() {
        return this.frequency
    }

    min() {        
        return fns_min(this.get_dates())
    }

    max() {
        return fns_max(this.get_dates())
    }

    size() {
        return this.data.length
    }

    create_date_serie() {        
        let amount = this.size() - 1
        let start_date = fns_parse(this.start, this.date_format, new Date())
        
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

export const ts_frequency = {
    'yearly' : 1,
    'quarter': 4,
    'monthly': 12,
    'weekly': 52,
}
