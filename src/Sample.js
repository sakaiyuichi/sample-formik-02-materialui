import React from 'react'

// material-ui
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Button,
} from '@material-ui/core/'
import DateFnsUtils from '@date-io/date-fns'
import ja from 'date-fns/locale/ja'
import {
    format,
    addDays,
} from 'date-fns'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

// formik
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

// スタイル
const myStyle = {
    padding: '10px'
}

// 選択肢のリスト（Select用）
const list = [
    {'id': '', 'name': '(未選択)'},
    {'id': '1', 'name': 'Aさん'},
    {'id': '2', 'name': 'Bさん'},
    {'id': '3', 'name': 'Cさん'},
]

// 選択肢のリスト（Checkbox用）
const list2 = [
    {'name': 'myCheck1', 'label': 'Aさん'},
    {'name': 'myCheck2', 'label': 'Bさん'},
    {'name': 'myCheck3', 'label': 'Cさん'},
]

// 初期値
const initValues = {
    myText: 'aaa',
    mySelect: '1',
    myCheck1: true,
    myCheck2: false,
    myCheck3: true,
    myDate: new Date(),
}

// バリデーションスキーマ
const validationSchema = Yup.object().shape({
    myText: Yup.string()
        .min(2, '短すぎます')
        .max(10, '長すぎます')
        .required('入力してください'),
    mySelect: Yup.string()
        .required('選択してください'),
    myCheck: Yup.string()
        .test('check-test', 'チェックしてください', function(value) {
            if ((this.parent.myCheck1 === false) &&
                (this.parent.myCheck2 === false) &&
                (this.parent.myCheck3 === false)) {
                return false
            } else {
                return true
            }
        }),
    myDate: Yup.date()
        .nullable()
        .required('入力してください')
        .min(addDays(new Date(), -3), '本日より3日以前の日付は入力できません')
        .max(addDays(new Date(), 3), '本日より3日以降の日付は入力できません'),
})

// サブミット
const onSubmit = (values) => {    
    const ymd = values.myDate ? format(values.myDate, 'yyyy-MM-dd') : ""
    alert(
        "myText: " + values.myText + "\n" +
        "mySelect: " + values.mySelect + "\n" +
        "myCheck1: " + values.myCheck1 + "\n" +
        "myCheck2: " + values.myCheck2 + "\n" +
        "myCheck3: " + values.myCheck3 + "\n" + 
        "myDate: " + ymd + "\n"
    )
}

const Sample = () => {
    return (
        <div>
            <Formik
                initialValues={initValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {props => (
                    <Form>
                        <div style={myStyle}>
                            <TextField
                                error={props.errors.myText ? true : false}
                                name="myText"
                                onChange={props.handleChange}
                                value={props.values.myText}
                                helperText={props.errors.myText ? props.errors.myText : "必須入力＆2～10文字以内"}
                            />
                        </div>
                        <div style={myStyle}>
                            <FormControl error={props.errors.mySelect ? true : false}>
                                <Select
                                    name="mySelect"
                                    onChange={props.handleChange}
                                    value={props.values.mySelect}
                                >
                                    {list.map(item => (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{props.errors.mySelect ? props.errors.mySelect : "必須選択"}</FormHelperText>
                            </FormControl>
                        </div>
                        <div style={myStyle}>
                            <FormControl error={props.errors.myCheck ? true : false}>
                                <FormGroup>
                                    {list2.map(item => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name={item.name}
                                                    checked={props.values[item.name]}
                                                    onChange={props.handleChange}
                                                />
                                            }
                                            label={item.label}
                                        />
                                    ))}
                                </FormGroup>
                                <FormHelperText>{props.errors.myCheck ? props.errors.myCheck : "必須選択"}</FormHelperText>
                            </FormControl>
                        </div>
                        <div style={myStyle}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    clearable
                                    margin="normal"
                                    format="yyyy-MM-dd"
                                    locale={ja}
                                    error={props.errors.myDate ? true : false}
                                    helperText={props.errors.myDate ? props.errors.myDate : "必須入力＆本日より前後3日以内の日付のみ入力可"}
                                    value={props.values.myDate}
                                    KeyboardButtonProps={{'aria-label': 'change date'}}
                                    onChange={date => props.setFieldValue("myDate", date)}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div style={myStyle}>
                            <Button type="submit" variant="contained" color="primary">入力されている値を表示</Button>
                        </div>
                        <div style={myStyle}>
                            <pre>
                                {JSON.stringify(props, null, 2)}
                            </pre>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Sample