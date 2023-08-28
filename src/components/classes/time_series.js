import { 
    format as fns_format,
    parse as fns_parse,
    min as fns_min,
    max as fns_max,
    isValid as fns_isValid,
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
        this.errors = []
    }
    
    clear_erros() {
        this.errors = []
    }

    get_ts() {
        return this.ts
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

    valid_allNumbers() {
        return this.ts.get_data().every(item => {                           
            return this.ts.get_required_keys_series().every(key => {                
                let num = Number(item[key])
                return (typeof num == 'number') && (!Number.isNaN(num))
            }) 
          })
    }

    valid_required_keys(){
        return this.ts.get_data().every(item => { 
            return this.ts.get_required_keys_series().every(key => {
                return Object.prototype.hasOwnProperty.call(item, key)
            }) 
        })
    }
    
    valid_isValidDate() {
        return this.ts.get_data().every(item => fns_isValid(item.date))
    }

    valid_has_key_date() {
        return this.ts.get_data().every(item => 'date' in item)
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

    valid_date_sequence() {
        this.ts.sort()
        const dt = this.ts.get_data()
        let index_out = []
        for (let i = 0; i < this.ts.size() - 1; i ++) {
          let diff = differenceInCalendarMonths(dt[i+1].date, dt[i].date)
          if(!(diff === 1 || diff === -1)) {
            index_out.push(i + 1)
          }
        }
        
        return !index_out.length && this.valid_isValidDate()        
    }

    valid_DuplicatesDates() {
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
        return ![...new Set(filtered)].length
    }
}

export class TimeSeries {
    constructor(data, 
        required_keys_series,
        start = new Date(), 
        frequency = ts_frequency.monthly, 
        date_format = TIME_SERIES_DATE_FORMAT
    ) {
        this.date_format = date_format;
        this.data = data.map(item => Object.assign({}, item));
        this.start = start;
        this.frequency = frequency;
        this.required_keys_series = required_keys_series

        this.parse()        
    }

    parse() {        
        this.data.forEach(item => {
            if(!('date' in item)) {
                item.date = ''
            }
            if(typeof item.date === 'string') {
                item.date = fns_parse(item.date, this.date_format, new Date())
            }
        })
    }

    toString() {
        return this.get_data().map(item => {
            if(fns_isValid(item.date)) {
                item.date = fns_format(item.date, this.date_format)                
            }
            return item
        })
    }

    sort() {
        this.data.sort((a, b) => compareAsc(a.date, b.date))
    }

    set_required_keys_series(req) {
        this.required_keys_series = req
    }

    get_required_keys_series() {
        return this.required_keys_series
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
        let start_date = (typeof this.start === 'string') ? fns_parse(this.start, this.date_format, new Date()) : this.start
        
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
