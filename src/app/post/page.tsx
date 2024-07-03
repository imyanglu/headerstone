import Image from "next/image"
import Link from "next/link"

/* eslint-disable @next/next/no-img-element */
const Data = [{ name: '死亡骑士', slug: 'deathknight', pic: 'https://pic.imgdb.cn/item/66845b2ed9c307b7e9f05c72.png' },
    { name: '恶魔猎人', slug: 'demonhunter', pic: 'https://pic.imgdb.cn/item/66845b4fd9c307b7e9f07312.png' },
    { name: '德鲁伊', slug: 'druid', pic: 'https://pic.imgdb.cn/item/66845b75d9c307b7e9f09452.png' },
    { name: '猎人', slug: 'hunter', pic: 'https://pic.imgdb.cn/item/66845b90d9c307b7e9f0ab9a.png' },
    { name: '法师', slug: 'mage', pic: 'https://pic.imgdb.cn/item/66845bafd9c307b7e9f0c626.png' },
    { name: '圣骑士', slug: 'paladin', pic: 'https://pic.imgdb.cn/item/66845bc1d9c307b7e9f0d558.png' },
        { name: '牧师', slug: 'priest', pic: 'https://pic.imgdb.cn/item/66845bcdd9c307b7e9f0e2de.png' },
    { name: '盗贼', slug: 'rogue', pic: 'https://pic.imgdb.cn/item/66845bdcd9c307b7e9f0ee87.png' },
    { name: '萨满', slug: 'shaman', pic: 'https://pic.imgdb.cn/item/66845be8d9c307b7e9f0f9a0.png' },
    { name: '术士', slug: 'warlock', pic: 'https://pic.imgdb.cn/item/66845bfbd9c307b7e9f109a2.png' },
    { name: '战士', slug: 'warrior', pic: 'https://pic.imgdb.cn/item/66845c0ad9c307b7e9f11afc.png' }
]

const Page = () => { 
    return <div className="w-[100vw]  relative min-h-[100vh] p-[24px] bg-[#711B1C]">
        <div className="w-[100vw] bottom-0 bg-[#000000] z-[-2]  absolute top-0 left-0">
            <img src='https://pic.imgdb.cn/item/66851590d9c307b7e91cba2a.jpg' className="w-full h-full" alt=''/>
        </div>
        <div className="flex justify-center items-center">
               <div className="relative w-[80px] h-[80px]">
            <Image src='/standard.svg' fill alt=''/>
        </div>
        <div className="text-[#fff] font-bold text-center text-[24px] mt-[6px] ml-[12px]">标准卡组</div>
        </div>
        <div className="grid grid-cols-2 mt-[24px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[8px] sm:gap-[20px]">
             { Data.map((item,index)=>{
                 return <Link href='/post/[slug]' as={`/post/${item.slug}`} key={index} className="relative p-[4px] sm:p-[20px] w-full aspect-[6/5]" >
                <img src={item.pic} className="w-full cursor-pointer aspect-[6/5]  workCard" alt=''/>
                <div className="absolute  sm:scale-1 top-[68%] text-[12px] sm:text-[14px] md:text-[14px] font-bold text-center left-[50%] translate-x-[-50%] text-[rgb(252,209,68)]">{ item.name}</div>
            </Link>
        })}
       </div>
    </div>
}
export default Page