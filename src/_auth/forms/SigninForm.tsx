import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/button';

import { useForm } from 'react-hook-form';
import { useToast } from '../../hooks/use-toast';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { SigninVaidation } from '../../lib/validation';
import { z } from 'zod';
import Loader from '../../components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';

import { useSignInAccount } from '../../lib/react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';

const SigninForm = () => {
	const { toast } = useToast();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	const navigate = useNavigate();

	const { mutateAsync: signInAccount } = useSignInAccount();

	// 1. Define your form.
	const form = useForm<z.infer<typeof SigninVaidation>>({
		resolver: zodResolver(SigninVaidation),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof SigninVaidation>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log('we are here');
		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});
		console.log(session);
		if (!session) {
			return toast({
				title: 'Signin failed. Please try again.',
			});
		}

		const isLoggedIn = await checkAuthUser();
		console.log(isLoggedIn);

		if (isLoggedIn) {
			form.reset();

			console.log('logged in');
			navigate('/');
		} else {
			return toast({
				title: 'Sign up failed. try again.',
			});
		}

		//console.log(values);
	}

	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<img src="/assets/images/logo_halashare.svg" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Log in to your account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					Welcome back! Please enter your details
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary">
						{isUserLoading ? (
							<div className="flex-center gap-2">
								<Loader />
								Loading...
							</div>
						) : (
							'Sign in'
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-center mt-2">
						Don't have an account?
						<Link
							to="/sign-up"
							className="text-primary-500 text-small-semibold ml-1"
						>
							sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SigninForm;
