import useEditPosition from '@hooks/position/useEditPosition'
import PositionForm from '@components/Form/position/Form'
import type {IPositionData} from 'app/types/position'

const EditPositionForm = ({
  onKeyDown,
  position,
}: {
  onKeyDown: () => void
  position: IPositionData
}): JSX.Element => {
  const onSubmit = useEditPosition(position.id, position.projectId)
  return (
    <PositionForm
      position={position}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
    />
  )
}

export default EditPositionForm
