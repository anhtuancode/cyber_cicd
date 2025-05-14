import prisma from "../common/prisma/init.prisma";

const articleService ={
    findAll: async (req, res, next) =>{
        let {page, pageSize, search} = req.query;
        page = +page > 0 ? +page:1;
        pageSize = +pageSize;
        search = search || ''


        const skip = (page - 1) * pageSize;

        // index = (page - 1) *pageSize

        const where = {content: {contains: search}};

        
        const articles = await prisma.articles.findMany({
            take: pageSize,
            skip: skip,
            orderBy: {createdAt: "desc"},
            where: where
        });

        const totalItem = await prisma.articles.count({
            where:where
        });

        const totalPage = Math.ceil(totalItem / pageSize);

        return {
            items: articles || [],
            page: page,
            pageSize: pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
        };
    }
}

export default articleService;