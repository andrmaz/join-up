import useEditPosition from '@hooks/position/useEditPosition'
import PositionForm from '@components/Form/position/Form'
import type {IPositionData} from 'app/types/position'

const EditPositionForm = ({
  position,
}: {
  position: IPositionData
}): JSX.Element => {
  const onSubmit = useEditPosition(position.id, position.projectId)
  return (
    <PositionForm
      id={position.projectId}
      position={position}
      onSubmit={onSubmit}
    />
  )
}

export default EditPositionForm
