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
import { Button, NativeSelectField, NativeSelectIndicator, NativeSelectRoot, Stack, Textarea } from "@chakra-ui/react";
import { Field, FieldLabel } from "@ark-ui/react";

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

  const onClickBack = () => {
    setContent("")
    onClose();
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} placement="center">
      <DialogContent>
        <DialogHeader>新規投稿</DialogHeader>

        <DialogCloseTrigger/>

        <DialogBody>
          <Stack gap={4}>
            <FieldLabel>カテゴリ</FieldLabel>
            <NativeSelectRoot>
              <NativeSelectField value={category} onChange={(e:ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
                <option value="雑談">雑談</option>
                <option value="技術">技術</option>
                <option value="日常">日常</option>
              </NativeSelectField>
              <NativeSelectIndicator/>
            </NativeSelectRoot>

            <Field.Root>
              <FieldLabel>ポスト</FieldLabel>
              <Textarea mt="13px" h="300px" autoresize value={content} onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}>
              </Textarea>
            </Field.Root>
          </Stack>
        </DialogBody>

        <DialogFooter justifyContent="space-between">
          <Button variant="ghost" onClick={onClickBack}>閉じる</Button>
          <Button colorPalette="black" onClick={onClickPost} disabled={content.trim() === ""}>投稿</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}