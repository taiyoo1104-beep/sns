import { useCallback } from "react"
import { toaster } from "../components/ui/toaster";

type Props = {
    title: string;
    type : "info" | "warning" | "success" | "error";
}

export const useShowMessage = () => {
    const showMessage = useCallback((props : Props) => {
        const {title,type} = props;
        toaster.create({
            title,
            type,
            duration:2000,
            meta:{closable:true}
        });
    },[])

    return showMessage;
}