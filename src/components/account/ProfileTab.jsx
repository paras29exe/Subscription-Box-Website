import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Calendar, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../store/asyncThunk/authThunk';
import { toast } from 'react-toastify';

const ProfileTab = () => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState({});
    const [error, setError] = useState('');
    const { userData, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const profileData = {
        name: userData?.name,
        email: userData?.email,
        dob: userData?.dob,
    };

    const { register, handleSubmit, formState: { errors }, reset, setError: setFormError } = useForm({
        defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const onPasswordSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setFormError('confirmPassword', { message: 'Passwords do not match' });
            return;
        }

        try {
            await dispatch(changePassword({currentPassword: data.currentPassword, newPassword: data.newPassword})).unwrap();
            toast.success('Password updated successfully', { className: 'bg-green-600 text-white font-semibold', icon: <CheckCircle size={24} color='white' />});
        } catch (error) {
            toast.error(error.message || 'Failed to update password');
        }
    };

    const ReadOnlyField = ({ label, value, icon: Icon }) => (
        <div>
            <label className="block font-medium mb-2 text-gray-800 dark:text-gray-300 text-lg">{label} :</label>
            <div className="flex items-center px-4 py-2 ">
                <Icon size={24} className="mr-2 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">- {value}</span>
            </div>
        </div>
    );

    const PasswordField = ({ id, label, ...rest }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">{label}</label>
            <div className="relative">
                <input
                    type={showPassword[id] ? "text" : "password"}
                    id={id}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 rounded-lg bg-transparent focus:ring-pink-500 focus:border-pink-500 text-gray-900 dark:text-white pr-10"
                    {...rest}
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
                    onClick={() => togglePasswordVisibility(id)}
                >
                    {showPassword[id] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {errors[id] && <p className="mt-1 text-sm text-red-500">{errors[id].message}</p>}
        </div>
    );

    return (
        <div className="backdrop-blur-md rounded-2xl  md:p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Profile Information</h2>

            <div className="space-y-4 mb-8">
                <ReadOnlyField label="Full Name" value={profileData.name} icon={User} />
                <ReadOnlyField label="Email Address" value={profileData.email} icon={Mail} />
                <ReadOnlyField label="Date of Birth" value={new Date(profileData.dob).toLocaleDateString()} icon={Calendar} />
            </div>

            <div className="border-t border-gray-300 dark:border-white/10 pt-6">
                <div className="flex items-center mb-4">
                    <Lock size={20} className="mr-2 text-gray-700 dark:text-gray-400" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Password</h3>
                </div>

                {!isChangingPassword ? (
                    <button
                        onClick={() => setIsChangingPassword(true)}
                        className="px-4 py-2 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
                    >
                        Change Password
                    </button>
                ) : (
                    <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <PasswordField
                            id="currentPassword"
                            label="Current Password"
                            {...register("currentPassword", { required: "Current password is required" })}
                        />
                        <PasswordField
                            id="newPassword"
                            label="New Password"
                            {...register("newPassword",
                                {
                                    required: "New password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                    validate: {
                                        hasUpperCase: value => /[A-Z]/.test(value) || 'Must include an uppercase letter',
                                        hasLowerCase: value => /[a-z]/.test(value) || 'Must include a lowercase letter',
                                        hasNumber: value => /[0-9]/.test(value) || 'Must include a number'
                                    }
                                })
                            }
                        />
                        <PasswordField
                            id="confirmPassword"
                            label="Confirm New Password"
                            {...register("confirmPassword",
                                { required: "Please confirm your password" })}
                        />

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-80 text-white font-medium rounded-lg transition-all disabled:bg-pink-400"
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>

                            <button
                                type="button"
                                onClick={() => { setIsChangingPassword(false); reset(); setError(''); }}
                                className="px-4 py-2 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProfileTab;
