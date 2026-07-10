const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const sendMail = async (options) => {
    await brevo.transactionalEmails.sendTransacEmail({
        subject: options.subject,
        textContent: options.message,
        sender: {
            name: "ShopO",
            email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email: options.email }],
    });
};

module.exports = sendMail;