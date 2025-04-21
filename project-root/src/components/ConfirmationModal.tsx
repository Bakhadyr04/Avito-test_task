import { Button } from "@/components/ui/button"

type Props = {
  message: string
  onClose: () => void
  onConfirm: () => void
}

const ConfirmationModal = ({ message, onClose, onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">{message}</h3>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
