// Import the Anchor library's prelude, which includes common definitions and macros for Solana programs
use anchor_lang::prelude::*;

// Declare the program's unique ID (public key), which identifies this program on the Solana blockchain
declare_id!("H4qUNMzu7xdqRoTwscP2raBHPuHWky2LX5pjwStSRryR");

// Define a constant for the size of Anchor's account discriminator (metadata identifier for each account)
pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

// Define the main module for the program, named `favorites`
#[program]
pub mod favorites {
    // Import all items from the parent scope
    use super::*;

    // Define an `initialize` function to set up the program, intended for any initial setup (if needed)
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // Log a greeting message along with the program's ID for debugging purposes
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    // Define the `set_favorites` function, which allows users to set their favorite number, color, and hobbies
    pub fn set_favorites(
        ctx: Context<SetFavorites>,  // Access accounts and context passed by Anchor
        number: u64,                 // A u64 value representing the user's favorite number
        color: String,               // A string for the user's favorite color
        hobbies: Vec<String>,        // A vector of strings for the user's favorite hobbies
    ) -> Result<()> {
        // Log a message showing the user's public key and the program's ID for debugging
        msg!(
            "Greetings from: {:?}, inside {:?}",
            ctx.accounts.user.key(),
            ctx.program_id
        );
        
        // Log the hobbies array for debugging purposes
        msg!("User's hobbies are {:?}", hobbies);

        // Set the `favorites` account data to store the passed-in number, color, and hobbies
        ctx.accounts.favorites.set_inner(Favorites {
            number,          // Set the user's favorite number
            color,           // Set the user's favorite color
            hobbies,         // Set the user's favorite hobbies
        });
        Ok(())
    }
}

// Define the `Initialize` context struct, used by the `initialize` function
#[derive(Accounts)]
pub struct Initialize {}

// Define the `SetFavorites` context struct, which validates and prepares accounts needed by `set_favorites`
#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]                   // `mut` signifies that `user` is a mutable account
    pub user: Signer<'info>,          // User who signs the transaction, required as the payer and to authorize changes

    #[account(
        init,                         // Indicates this account will be created
        payer = user,                 // `user` pays for account creation
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE, // Allocate enough space for the `Favorites` data and discriminator
        seeds = [b"favorites", user.key().as_ref()], // Use a PDA derived from "favorites" and `user` public key
        bump                          // Store the bump (nonce) for this PDA to verify derivation
    )]
    pub favorites: Account<'info, Favorites>, // Define `favorites` as an account to store `Favorites` struct data

    pub system_program: Program<'info, System>, // Reference to Solana's system program (needed for creating accounts)
}

// Define the `Favorites` data structure to hold user's favorite number, color, and hobbies
#[account]
#[derive(InitSpace)] // Derive `InitSpace` to calculate the required space for this account
pub struct Favorites {
    pub number: u64,                  // Store user's favorite number as a 64-bit unsigned integer
    #[max_len(50)]                    // Limit `color` to a maximum of 50 characters
    pub color: String,                // Store user's favorite color as a string
    #[max_len(5, 50)]                 // Limit `hobbies` vector to 5 items, each with a max length of 50 characters
    pub hobbies: Vec<String>,         // Store user's favorite hobbies as a vector of strings
}
