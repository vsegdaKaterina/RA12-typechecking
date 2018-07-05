'use strict';

const DateInput = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type="text" className="form-control" name={props.name} onChange={props.onChange}
             value={props.value} required={props.required} placeholder="YYYY-MM-DD"/>
    </div>
  )
};

DateInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: birtDayPropTypes
}

DateInput.defaultProps = {
  value: getDate()
}

function getDate() {
  let date = new Date();
  date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

const birtDayPropTypes = (props, propsName, component) => {
  const dateOfBirth = props[propsName],
  isBirthDay = (typeof dateOfBirth === 'string') && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateOfBirth);
  if (!isBirthDay) return (new Error(`Неверный формат параметра ${propName} в компоненте ${component}: необходимо указать дату рождения в формате YYYY-MM-DD`));
}

