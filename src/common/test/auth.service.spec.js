import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import authService from "../../services/auth.service";
import prisma from "../prisma/init.prisma";

describe("Register" , ()=>{
    beforeEach(()=>{
        console.log("before Each");
        jest.spyOn(prisma.users, "findUnique");
        jest.spyOn(prisma.users, "create");
    });

    afterEach(()=>{
        console.log("after Each")
    });

    it("Case 1: Tạo người dùng mới với thông tin hợp lệ", async ()=>{
        console.log("Case 1: chạy");
        // mockResolvedValue(): áp dụng cho những hàm async await
        // mockReturnValue(): áp dụng cho những hàm bình thường 
        await prisma.users.findUnique.mockResolvedValue(null)
        await prisma.users.create.mockResolvedValue({
        id: 7,
        email: 'test@gmail.com',
        fullName: 'Nguyễn Thị Test',
        avatar: null,
        password: '$2b$10$28m9/CvKbvYpTAE6FJfkU.m7L7Bv0wZ4LZVWE/9QcQ/XpHoQh8nH2',
        facebookId: null,
        googleId: null,
        roleId: 2,
        deletedBy: 0,
        isDeleted: false,
        deletedAt: null,
        createdAt: '2025-04-13T08:00:45.000Z',
        updatedAt: '2025-04-13T08:00:45.000Z'
        })


        const result = await authService.register({
            body: {
                fullname: "Nguyễn Thị Test",
                email: "test@gmail.com",
                password: "1234"
            }
        });


        // kiểm tra dữ liệu đầu ra 
        expect(result).not.toHaveProperty("password");
        expect(result).toHaveProperty("email");
        expect(typeof result.email).toBe("string");
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)).toBe(true);

    })

    it("Case 2: Tạo người dùng mới với thông tin không hợp lệ", ()=>{
        console.log("Case 1: chạy")
    })
});