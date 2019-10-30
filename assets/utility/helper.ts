const removeGLSLIfyStr = (str: string): string => {
    const prefix = '#define GLSLIFY 1';

    return str.replace(`${prefix}\r\n`, '').replace(`${prefix}\n`, '');
};

export {removeGLSLIfyStr}
