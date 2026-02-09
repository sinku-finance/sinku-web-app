import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { NavArrowDown } from "iconoir-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border border-gray-200 bg-gray-50 rounded-2xl overflow-hidden transition-all duration-200 hover:border-gray-300 hover:shadow-sm", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between px-6 md:px-8 py-6 md:py-8 text-left text-lg md:text-xl lg:text-2xl font-medium text-black transition-all duration-200 hover:text-gray-700 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <NavArrowDown className="h-5 w-5 md:h-6 md:w-6 shrink-0 transition-transform duration-300 ease-in-out text-gray-600" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm md:text-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("px-6 md:px-8 pb-6 md:pb-8 pt-0 text-gray-600 whitespace-pre-line leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
