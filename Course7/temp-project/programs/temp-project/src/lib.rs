use anchor_lang::prelude::*;

declare_id!("Zrj8JvDuPy8nbYqP5Gfd3Vs2zRuavKbHvfQnTSHnNru");

#[program]
pub mod temp_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
