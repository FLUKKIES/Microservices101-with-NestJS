# NestJS Microservices Workspace

Repository นี้เป็นโปรเจกต์สำหรับศึกษาและทดลองเขียน **Microservices ด้วย NestJS** โดยมีการแบ่งโปรเจกต์ย่อยเพื่อทดสอบการใช้ Transport layers ที่แตกต่างกัน และเครื่องมือจัดการ Monorepo ที่ต่างกัน

## โครงสร้างโปรเจกต์

ใน Repository นี้จะประกอบไปด้วย 2 โปรเจกต์หลัก (Monorepo) ได้แก่:

### 1. `microservice-tcp-turbo`
โปรเจกต์นี้ใช้ **Turborepo** ในการจัดการ Monorepo และใช้การสื่อสารระหว่างเซอร์วิสผ่าน **TCP Transport**

- **Monorepo Tool**: Turborepo
- **Package Manager**: pnpm
- **Transport Layer**: TCP
- **Services**:
  - `api-gateway`: รับ Request จากภายนอกและกระจายไปยังเซอร์วิสอื่นๆ
  - `orders-service`: จัดการข้อมูลคำสั่งซื้อ
  - `products-service`: จัดการข้อมูลสินค้า
  - `users-service`: จัดการข้อมูลผู้ใช้งาน
  - `payments-service`: จัดการระบบชำระเงิน

**วิธีรันโปรเจกต์ TCP (Turbo):**
```bash
cd microservice-tcp-turbo
pnpm install
pnpm run dev
```

---

### 2. `microservice-nx`
โปรเจกต์นี้ใช้ **Nx** ในการจัดการ Monorepo และใช้การสื่อสารระหว่างเซอร์วิสผ่าน **gRPC Transport** (ใช้ Protocol Buffers)

- **Monorepo Tool**: Nx
- **Package Manager**: npm
- **Transport Layer**: gRPC
- **Services**:
  - `api-gateway`: รับ Request จากภายนอกและเรียกใช้ gRPC service ของ products
  - `products`: ให้บริการข้อมูลสินค้าผ่าน gRPC

**วิธีรันโปรเจกต์ gRPC (Nx):**
```bash
cd microservice-nx
npm install
# รันทุกเซอร์วิสพร้อมกัน
npx nx run-many --target=serve --all
# หรือแยกรันทีละเซอร์วิส
npx nx serve api-gateway
npx nx serve products
```

## สรุปเทคโนโลยีที่ใช้เรียนรู้ใน Repository นี้
- **NestJS Microservices**: รูปแบบการสร้างแอปพลิเคชันแบบกระจายศูนย์
- **Transport Layers**:
  - **TCP**: การสื่อสารระดับพื้นฐานผ่าน Network Sockets 
  - **gRPC**: การสื่อสารประสิทธิภาพสูงด้วย HTTP/2 และ Protobuf
- **Monorepo Management**:
  - **Turborepo**: เน้นความเร็วและคอนฟิกง่าย
  - **Nx**: เครื่องมือจัดการ Monorepo ที่ทรงพลัง มี ecosystem ครบครัน
