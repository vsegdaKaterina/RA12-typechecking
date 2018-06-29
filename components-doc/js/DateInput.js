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
  value: PropTypes.string
}

DateInput.defaultProps = {
  value: getDate()
}

function getDate() {
  let date = new Date();
  date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

