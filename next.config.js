/** @type {import('next').NextConfig} */
const path = require('path')
module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pic.imgdb.cn',
                pathname: '/**',
            }

        ],
    },
}