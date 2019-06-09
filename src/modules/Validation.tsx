//const straightCheck = new RegExp('^a*b*c*d*e*f*g*h*i*j*k*l*m*n*o*p*q*r*s*t*u*v*w*x*y*z*$');
const excludeCheck = new RegExp('^[^iOI]*$');
const caseCheck = new RegExp('^[a-z]+$');
const lengthCheck = new RegExp('.{1,32}');
const consecutiveCheck = new RegExp('([a-z])\\1');

const validate = (username: string, password: string):boolean => {
    console.log(username, password);
    if (username === '') return false;
    if (password === '') return false;
    if (excludeCheck.exec(password) === null) return false;
    if (caseCheck.exec(password) === null) return false;
    if (lengthCheck.exec(password) === null) return false;
    if (consecutiveCheck.exec(password) === null) return false;

    return true;
}

export default validate;