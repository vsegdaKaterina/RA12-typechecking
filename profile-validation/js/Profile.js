'use strict';

const profileStyle = {
  border: '1px solid #cccccc',
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  margin: '5px'
};

const imageStyle = {
  width: '200px',
  height: '200px'
};

const Profile = props => {
  return (
    <div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
      <div style={profileStyle}>
        <h2>{props.first_name} {props.last_name}</h2>
        <div>
          <img src={props.img} className="img-thumbnail" style={imageStyle}/>
        </div>
        <p>vk: <a href={props.url}>{props.url}</a></p>
        <p>birthday: <a href={props.birthday}>{props.birthday}</a></p>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  img: './images/profile.jpg'
}

Profile.propTypes = {
  first_name: PropTypes.node,
  last_name: PropTypes.node,
  img: PropTypes.string,
  url: urlPropType,
  birthday: birthdayPropTypeChecker
};

const urlPropType = (props, propName, componentName) => {
  const url = props[propName];
  const isUrlCorrect = (typeof url === 'string') && /^https:\/\/vk.com\/(id[0-9]+|[A-Za-z0-9_-]+)$/.test(url);
  if (!isUrlCorrect) {
    return new Error(`Неверный формат параметра ${propName} в компоненте ${componentName}: необходим указать корректный url`);
  }
  return null;
};

const createChainableTypeChecker = (validate) => {
  const checkType = (isRequired, props, propName, componentName) => {
    if (!props[propName]) {
      if (isRequired) {
        return new Error(`Обязательный атрибут ${propName} не был передан компоненту ${componentName}`)
      }
      return null;
    } else {
      return validate(props, propName, componentName);
    }
  };
  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
};

const birthdayPropType = (props, propName, componentName) => {
  const birthday = props[propName];
  const isBirthday = (typeof birthday === 'string') && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(birthday);
  const isBirthdayLowerThanToday = () => {
    const birthDate = new Date(birthday.slice(0, 4), +birthday.slice(5, 7) - 1, birthday.slice(8, 10));
    return birthDate < new Date();
  }

  if (!isBirthday) {
    return new Error(`Неверный формат параметра ${propName} в компоненте ${componentName}: необходим указать дату рождения в формате YYYY-MM-DD`);
  } else if (!isBirthdayLowerThanToday()) {
    return new Error(`Неверн указан параметр ${propName} в компоненте ${componentName}: дата рождения не должна быть больше текущей`);
  }
  return null;
}

const birthdayPropTypeChecker = createChainableTypeChecker(birthdayPropType);