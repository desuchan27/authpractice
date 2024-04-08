"use client"

import { Button } from "../../ui/button"
import * as z from 'zod'
import { settings } from "@/actions/settings"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState, useTransition } from "react"
import { SettingsSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseCurrentUser } from "@/hooks/useCurrentUser"
import FormError from "@/components/FormError"
import FormSuccess from "@/components/FormSuccess"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { UserRole } from "@prisma/client"
import { Switch } from "@/components/ui/switch"

export const SettingsPage = () => {
    const user = UseCurrentUser()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()


    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            username: user?.username || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            password: undefined,
            newPassword: undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
        }

    })
    console.log("user?.role:", user?.role);
    console.log("defaultValues.role:", form.getValues("role"));

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                    }
                    if (data.success) {
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <Card className="w-full bg-secondary shadow-sm md:w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOAuth === false &&
                                (<>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        type="email"
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
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder='******'
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder='******'
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>)
                            }
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value={UserRole.USER}>
                                                    User
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="isTwoFactorEnabled"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Two Factor Authentication</FormLabel>
                                                    <FormDescription>Enable two factor authentication for your account</FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        disabled={isPending}
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                        </div>
                        {error && <FormError message={error} />}
                        {success && <FormSuccess message={success} />}
                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}