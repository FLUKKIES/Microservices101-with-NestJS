import { Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class LoggerMiddleware implements NestMiddleware {
    // สร้าง Instance ของ Logger พร้อมกำหนด Context Name เป็น 'HTTP'
    private readonly logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void {
        // ดึงข้อมูลเบื้องต้นจาก Request
        const { ip, method, originalUrl } = req;
        const userAgent = req.get("user-agent") || '';

        //จับเวลาเริ่มต้น
        const startTime = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const duration = Date.now() - startTime;

            // รูปแบบข้อความ Log ที่อ่านง่าย
            const logMessage = `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip} [${duration}ms]`;

            // เลือกใช้สี/ระดับ Log ตาม Status Code (เป็น Best Practice ที่ช่วยให้มอนิเตอร์ระบบง่ายขึ้น)
            if (statusCode >= 500) {
                this.logger.error(logMessage);
            } else if (statusCode >= 400) {
                this.logger.warn(logMessage);
            } else {
                this.logger.log(logMessage);
            }
        });

        // สำคัญมาก: ต้องเรียก next() เสมอ เพื่อให้ Request ไปทำงานในด่านต่อไป (Guards/Controller)
        next();
    }

}