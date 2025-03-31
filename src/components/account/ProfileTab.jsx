import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Calendar, Lock, Eye, EyeOff } from 'lucide-react';
import { account } from '../../appwriteAuth/appwrite.config';

const ProfileTab = () => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const profileData = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        dob: '1990-01-01',
    };

    const { register, handleSubmit, formState: { errors }, watch, reset, setError: setFormError } = useForm({
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

        setLoading(true);
        setError('');

        try {
            await account.updatePassword(data.newPassword, data.currentPassword);
            setIsChangingPassword(false);
            reset();
        } catch (err) {
            setError(err.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const ReadOnlyField = ({ label, value, icon: Icon }) => (
        <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">{label}</label>
            <div className="flex items-center px-4 py-2 border border-white/20 rounded-lg bg-black/40 backdrop-blur-md">
                <Icon size={18} className="mr-2 text-gray-400" />
                <span className="text-white">{value}</span>
            </div>
        </div>
    );

    const PasswordField = ({ id, label, ...rest }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-300">{label}</label>
            <div className="relative">
                <input
                    type={showPassword[id] ? "text" : "password"}
                    id={id}
                    className="w-full px-4 py-2 border border-white/20 rounded-lg bg-black/40 backdrop-blur-md focus:ring-pink-500 focus:border-pink-500 text-white pr-10"
                    {...rest}
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => togglePasswordVisibility(id)}
                >
                    {showPassword[id] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {errors[id] && <p className="mt-1 text-sm text-red-500">{errors[id].message}</p>}
        </div>
    );

    return (
        <div className=" backdrop-blur-md rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white">Profile Information</h2>

            <div className="space-y-4 mb-8">
                <ReadOnlyField label="Full Name" value={profileData.name} icon={User} />
                <ReadOnlyField label="Email Address" value={profileData.email} icon={Mail} />
                <ReadOnlyField label="Date of Birth" value={new Date(profileData.dob).toLocaleDateString()} icon={Calendar} />
            </div>

            <div className="border-t border-white/10 pt-6">
                <div className="flex items-center mb-4">
                    <Lock size={20} className="mr-2 text-gray-400" />
                    <h3 className="text-xl font-medium text-white">Password</h3>
                </div>

                {!isChangingPassword ? (
                    <button
                        onClick={() => setIsChangingPassword(true)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg transition-all"
                    >
                        Change Password
                    </button>
                ) : (
                    <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <PasswordField id="currentPassword" label="Current Password" {...register("currentPassword", { required: "Current password is required" })} />
                        <PasswordField id="newPassword" label="New Password" {...register("newPassword", { required: "New password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} />
                        <PasswordField id="confirmPassword" label="Confirm New Password" {...register("confirmPassword", { required: "Please confirm your password" })} />

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
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg transition-all"
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
