"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  direction?: 'top' | 'right' | 'bottom' | 'left';
  dismissible?: boolean;
  handleOnly?: boolean;
};

const Drawer = ({ direction = 'bottom', dismissible = true, handleOnly = true, ...props }: DrawerProps) => (
  <DrawerPrimitive.Root direction={direction} dismissible={dismissible} handleOnly={handleOnly} {...props} />
);
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    direction?: 'top' | 'right' | 'bottom' | 'left';
  }
>(({ className, children, direction = 'bottom', ...props }, ref) => {
  const directionClasses = {
    top: 'inset-x-0 top-0 rounded-b-[10px]',
    right: 'inset-y-0 right-0 rounded-l-[10px] w-full max-w-[90vw] md:w-[500px]',
    bottom: 'inset-x-0 bottom-0 rounded-t-[10px]',
    left: 'inset-y-0 left-0 rounded-r-[10px] w-full max-w-[90vw] md:w-[500px]',
  };

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 flex flex-col border bg-background',
          directionClasses[direction],
          direction === 'bottom' && 'mt-24 h-auto',
          direction === 'right' && 'h-full',
          direction === 'left' && 'h-full',
          direction === 'top' && 'mb-24 h-auto',
          className
        )}
        {...props}
      >
        {direction === 'bottom' && (
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        )}
        {(direction === 'right' || direction === 'left') && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-2 h-[100px] w-2 rounded-full bg-muted" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
