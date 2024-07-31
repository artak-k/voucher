class Helper {
 static generateCode(length = 10) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let code = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return code;
  }

}

export default Helper
