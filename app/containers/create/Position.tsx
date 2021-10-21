import PositionForm from '@components/Form/Position'
import useAddPosition from '@hooks/position/useAddPosition'

const CreatePositionForm = ({id}: {id: number}): JSX.Element => {
  const onSubmit = useAddPosition(id)
  return <PositionForm id={id} onSubmit={onSubmit} />
}

export default CreatePositionForm
