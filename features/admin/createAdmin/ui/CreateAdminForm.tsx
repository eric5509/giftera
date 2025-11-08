import { useCreateAdminForm } from '../models/useCreateAdminForm'

export default function CreateAdminForm() {
    const { createAdminRequest, error, errors, isError, isLoading, isSuccess, onChange, setErrors, setValues, values } = useCreateAdminForm()
    return (
        <div>
            <button onClick={createAdminRequest}></button>
        </div>
    )
}
