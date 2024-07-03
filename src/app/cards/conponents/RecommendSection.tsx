/* eslint-disable @next/next/no-img-element */
import { Title, Card } from "@/app/compoents"
import CardGroup from "./CardGroup"

const data = [{
    name: '铺场骑',
    code: 'dhjasgdhjasgdhasghdjas',
    pic: 'https://pic.imgdb.cn/item/66845bc1d9c307b7e9f0d558.png',
    winningRate: '59.62',
    
}]
const RecommendSection = () => {
    return <div className="">
        <Title label={<div className="text-[rgb(97,67,38)] w-[fit-content] translate-y-[-2px] font-bold text-[16px]">今日推荐</div>} />
        {data.map(i => <CardGroup key={i.code} {...i}  cards={[]}/>)}
    </div>
}
export default RecommendSection