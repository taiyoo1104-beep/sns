import { useState, type ChangeEvent, type FC } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "../../ui/dialog"
import { Button , Stack} from "@chakra-ui/react";
import { userAddUser } from "../../../hooks/useAddUser";
import { LabelWithForm } from "../LabelWithForm";

type Props = {
  isOpen : boolean;
  onClose : () => void;
}

export const AddUserModal:FC<Props> = (props) => {
  const { isOpen,onClose } = props;
  const { Add } = userAddUser();
  const [userName , setUserName] = useState("");
  const [userId , setUserId] = useState("");
  const [password , setPassword] = useState("");
  // const [userIcon , setUserIcon] = useState("");

  const onChangeName = (e:ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
  const onChangeId   = (e:ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)
  const onChangePass = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onClickAdd = async () => {
    const isSuccess = await Add({userName : userName,userId : userId,password:password})
    if(isSuccess){
      setUserName("")
      setUserId("")
      setPassword("")
    
      onClose();
    }    
  }

  const onClickBack = () => {
      setUserName("")
      setUserId("")
      setPassword("")
    
      onClose();
  }
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} placement="center">
      <DialogContent>
        <DialogHeader>ユーザー登録</DialogHeader>

        <DialogCloseTrigger/>

        <DialogBody>
          <Stack gap={4}>
            <LabelWithForm placeHolder="表示名を入力（６文字以上１２文字以下）" value={userName} onChange={onChangeName}>ユーザー名</LabelWithForm>
            <LabelWithForm placeHolder="IDを入力（６文字以上１２文字以下）" value={userId} onChange={onChangeId}>ユーザーID</LabelWithForm>
            <LabelWithForm placeHolder="パスワードを入力（８文字以上）" value={password} onChange={onChangePass} type="password">パスワード</LabelWithForm>
          </Stack>
        </DialogBody>

        <DialogFooter justifyContent="space-between">
          <Button variant="ghost" onClick={onClickBack}>閉じる</Button>
          <Button colorPalette="black" onClick={onClickAdd} disabled={userName.trim() === "" || userId.trim() === "" || password.trim() === ""}>登録</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}