const db = require("../../db/db")
const ejs = require('ejs')
const { sendMail } = require("../helpers/email")


module.exports =  async () => {
  const items = await (await db.query("SELECT * FROM dbo.project_assign_queue where isSent = 0")).recordset
  // console.log({items});
    
    for (let item of items) {
        const user = await (await db.query("SELECT * FROM dbo.users where id = '" + item.user_id + "'")).recordset[0]
        const project = await (await db.query("SELECT * FROM dbo.projects where team_lead_id = '" + item.user_id + "'")).recordset[0]
        ejs.renderFile('templates/projectEmail.ejs', { username: user.username, email: user.email, project_name: project.project_name }, async (error, data) => {
          if (error) return;
          const message = {
            from: {
              name: "User System",
              address: "sammydorcis@outlook.com",
            },
            to: user.email,
            subject: "Project Assign Success",
            html: data,
          }
          try {
            await sendMail(message);
            console.log("sending");
              await db.query(
                "UPDATE dbo.project_assign_queue set isSent = 1 where id = '" +
                  item.id +
                  "'"
              );
            await db.query("UPDATE dbo.users set project_assigned = 'assigned' where id = '" + item.user_id + "'");
              console.log(`Project assigned Email sent to ${user.email}`);
          } catch (error) {
            console.log(error.message);
            console.log(`Couldn't send email to......... ${user.email}`);
          }  
        })
    }
}