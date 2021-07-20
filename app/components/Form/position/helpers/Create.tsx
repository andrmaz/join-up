import useAddPosition from '@hooks/position/useAddPosition'
import PositionForm from '@components/Form/position/Form'

const CreatePositionForm = ({id}: {id: number}): JSX.Element => {
  const onSubmit = useAddPosition(id)
  return <PositionForm id={id} onSubmit={onSubmit} />
}

export default CreatePositionForm
