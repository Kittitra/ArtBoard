import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertBasicProps {
    message: string | undefined;
}

export function AlertBasic({ message }: AlertBasicProps) {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>{message}</AlertTitle>
      {/* <AlertDescription>
        Your profile information has been saved. Changes will be reflected
        immediately.
      </AlertDescription> */}
    </Alert>
  )
}
