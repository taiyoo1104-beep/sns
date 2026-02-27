import { useCallback, type FC } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "../../ui/dialog"
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen : boolean;
  onClose : () => void;
}

export const LogoutModal:FC<Props> = (props) => {
  const { isOpen,onClose } = props;
  const navigate = useNavigate();

  const onClickLogout = useCallback(() => {
      navigate("/login");
      onClose();
    },[]);

  const onClickBack = () => {
    onClose();
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} placement="center">
      <DialogContent>
        <DialogHeader>ログアウトしますか？</DialogHeader>
        <DialogFooter justifyContent="space-between">
          <Button variant="ghost" onClick={onClickBack}>閉じる</Button>
          <Button colorPalette="red" onClick={onClickLogout}>ログアウト</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}