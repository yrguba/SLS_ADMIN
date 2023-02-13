export const cutRegCode = (code) => {
    const regCodeCharArray = code.split('');
    if (
        (regCodeCharArray[1] === '4' && regCodeCharArray[2] === '2') ||
        (regCodeCharArray[1] === '2' && regCodeCharArray[2] === '3')
    ) {
        delete regCodeCharArray[0];
        delete regCodeCharArray[3];
        delete regCodeCharArray[6];
        delete regCodeCharArray[10];
        delete regCodeCharArray[14];
    } else {
        delete regCodeCharArray[0];
        delete regCodeCharArray[5];
        delete regCodeCharArray[6];
        delete regCodeCharArray[11];
        delete regCodeCharArray[14];
    }
    return regCodeCharArray.join('');
};
