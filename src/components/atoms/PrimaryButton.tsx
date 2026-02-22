import { Button } from "@chakra-ui/react"
import type { FC } from "react";

type Props = {
    children:string;
    onClick : () => void;
}
export const PrimaryButton:FC<Props> = (props) => {
    const {onClick,children} = props;
    return (
        <Button bg="black" color="white" _hover={{opacity:0.8}} onClick={onClick}>{children}</Button>
    )
}