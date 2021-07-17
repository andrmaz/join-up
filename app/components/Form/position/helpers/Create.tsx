import useAddPosition from '@hooks/position/useAddPosition'
import PositionForm from '@components/Form/position/Form'

const CreatePositionForm = ({
  id,
  onKeyDown,
}: {
  id: number
  onKeyDown: () => void
}): JSX.Element => {
  const onSubmit = useAddPosition(id)
  return <PositionForm id={id} onSubmit={onSubmit} onKeyDown={onKeyDown} />
}

export default CreatePositionForm
