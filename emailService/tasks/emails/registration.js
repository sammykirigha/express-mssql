const db = require("../../db/db")
const ejs = require('ejs')
const { sendMail } = require("../helpers/email");


module.exports =  async () => {
  const items = await (await db.query("SELECT * FROM dbo.registration_queue where isSent = 0")).recordset
  
    for (let item of items) {
        const user = await (await db.query("SELECT * FROM dbo.users where id = '" + item.user_id + "'")).recordset[0]
        ejs.renderFile('templates/registration.ejs', { username: user.username, email: user.email, password: "pass123." }, async (error, data) => {
            if (error) return;
            const message = {
            from: {
              name: "User System",
              address: "sammydorcis@outlook.com",
            },
            to: user.email,
            subject: "Registration Success",
            html: data,
          };
          try {
              await sendMail(message);
              await db.query(
                "UPDATE dbo.registration_queue set isSent = 1 where id = '" +
                  item.id +
                  "'"
              );
              console.log(`Registration Email sent to ${user.email}`);
          } catch (error) {
              console.log(error);
            console.log(`Couldn't send email to<<<<<>>>>> ${user.email}`);
          }  
        })
    }
}