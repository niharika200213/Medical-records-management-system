import * as emailjs from '@emailjs/browser'
const email = async (subject, message, from) => {
    try {
        await emailjs.send("service_cewwsrn", "template_oxl7cvx", 
            {
                subject: subject,
                message: message,
                from: from,
            },
            "gO7FH2RHlPCs5dHBX"
        );
        return "Message sent successfully"
    }
    catch (err) {
        console.log(err.text)
        return "There was an error please try again";
    }
}

export default email;