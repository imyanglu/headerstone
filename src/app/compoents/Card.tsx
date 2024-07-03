'use client'
import { ReactNode, useCallback, useEffect, useRef } from "react";

type Card = {
    children: ReactNode
}

const Card = ({ children }: Card) => {
    const containerRef = useRef<HTMLDivElement>(null)
 
    useEffect(() => {
   
    }, [])

    return <div className="card w-[fit-content] h-[fit-content]  transition-transform perspective-[1000]" ref={containerRef}>
        {children}
  </div>
}
export default Card;