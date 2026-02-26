import { useState, type ChangeEvent, type FC } from "react";
import { usePostContent } from "../../../hooks/usePostContent";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "../../ui/dialog"
import { Button, NativeSelectField, NativeSelectRoot, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "@ark-ui/react";

type Props = {
  isOpen : boolean;
  onClose : () => void;
  onPostSuccess : () => void;
}

export const NewPostModal:FC<Props> = (props) => {
  const { isOpen,onClose,onPostSuccess } = props;
  const { post } = usePostContent();
  const [content , setContent] = useState("");
  const [category , setCategory] = useState("雑談");

  const onClickPost = async () => {
    await post({content : content,category : category})
    setContent("")
    onClose();
    onPostSuccess();
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} placement="center">
      <DialogContent>
        <DialogHeader>新規投稿</DialogHeader>

        <DialogCloseTrigger/>

        <DialogBody>
          <Stack gap={4}>
            <NativeSelectRoot>
              <NativeSelectField value={category} onChange={(e:ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
                <option value="雑談">雑談</option>
                <option value="技術">技術</option>
                <option value="日常">日常</option>
              </NativeSelectField>
            </NativeSelectRoot>

            <Field.Root>
              <Textarea h="300px" autoresize value={content} onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}>
              </Textarea>
            </Field.Root>
          </Stack>
        </DialogBody>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>閉じる</Button>
          <Button colorPalette="blue" onClick={onClickPost} disabled={content.trim() === ""}>投稿</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}