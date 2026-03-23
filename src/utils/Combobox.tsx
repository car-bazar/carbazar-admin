"use client";

import { Check } from "lucide-react"
import { RiArrowDropDownLine } from "react-icons/ri"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import React, { useEffect, useRef, useState } from 'react'

interface Item {
  name: string
  id: number | string
}

interface ComboboxProps {
  label: string
  items: Item[]
  selected: string | null
  setSelected: (value: string | null) => void
  enableScroll?: boolean
  disabled?: boolean
  className?: string
  buttonClassName?: string
  placeholder?: string
  showOutile?: boolean
  useSearch?: boolean
  offset?: number
}

const Combobox: React.FC<ComboboxProps> = ({
  label,
  items,
  selected,
  setSelected,
  enableScroll = false,
  disabled = false,
  className = '',
  buttonClassName,
  placeholder,
  showOutile = true,
  useSearch = true,
  offset = 0
}) => {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [buttonWidth, setButtonWidth] = useState<number | null>(null)

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth)
    }
  },  [items, selected])

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <p className="text-secondary-foreground text-sm" dangerouslySetInnerHTML={{ __html: label }} />
      <Popover open={open} onOpenChange={setOpen} modal={true} >
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            role="combobox"
            aria-expanded={open}
            className={`justify-between bg-white shadow-none [&_svg]:size-6 px-0 hover:bg-white capitalize ${showOutile && 'border border-tiffany px-3 py-5'} ${buttonClassName}`}
            disabled={disabled}
          >
            {selected ? items.find(item => (item.id + '_' + item.name) === selected)?.name : placeholder ?? `Select ${label}`}
            <RiArrowDropDownLine className="text-background" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className={`w-auto p-0 min-w-[250px] ml-${offset}`}
          style={{
            width: buttonWidth ? `${buttonWidth}px` : "auto",
            maxHeight: enableScroll ? "400px" : "auto",
            overflowY: enableScroll ? "auto" : "visible",
          }}
        >
          <Command>
            {useSearch &&
                <CommandInput placeholder={`Search ${label}...`} className="h-9" disabled={disabled} /> }
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {items.map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item.id + '_' +  item.name}
                    onSelect={() => {
                      setSelected((item.id + '_' +  item.name) === selected ? "" : item.id + '_' +  item.name)
                      setOpen(false)
                    }}
                    className="capitalize"
                  >
                    {item.name}
                    <Check className={cn("ml-auto", selected === (item.id + '_' +  item.name) ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox