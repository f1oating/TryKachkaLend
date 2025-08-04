import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission(validatedData);
      
      // In a real application, you would send an email here
      // For now, we'll just log the submission
      console.log("New contact submission:", submission);
      
      // Here you would typically use a service like Nodemailer to send an email
      // Example (commented out since we don't have email credentials):
      /*
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || 'dev@example.com',
        subject: `Нова заявка від ${validatedData.name}`,
        html: `
          <h2>Нова заявка з сайту</h2>
          <p><strong>Ім'я:</strong> ${validatedData.name}</p>
          <p><strong>Контакт:</strong> ${validatedData.contact}</p>
          <p><strong>Повідомлення:</strong></p>
          <p>${validatedData.message}</p>
        `,
      });
      */
      
      res.json({ success: true, message: "Заявку успішно відправлено!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Некоректні дані форми", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Помилка сервера. Спробуйте пізніше." 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
