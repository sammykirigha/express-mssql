const nodemailer = require('nodemailer');
const dontenv = require('dotenv')
dontenv.config()

function createTransporter(config) {
    let transporter = nodemailer.createTransport(config);
    return transporter;
}

const defaultConfig = {
    service: "hotmail",
    auth: {
        user: "sammydorcis@outlook.com",
        pass: "Sammy3646."
    }
};


module.exports = {
    sendMail: async (email) => {
        const transporter = createTransporter(defaultConfig);
        await transporter.verify();
        await transporter.sendMail(email);
    }
};