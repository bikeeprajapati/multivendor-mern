const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

const sendMail = async (options) => {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
        name: "ShopO",
        email: process.env.BREVO_SENDER_EMAIL,
    };
    sendSmtpEmail.to = [{ email: options.email }];
    sendSmtpEmail.subject = options.subject;
    sendSmtpEmail.textContent = options.message;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = sendMail;