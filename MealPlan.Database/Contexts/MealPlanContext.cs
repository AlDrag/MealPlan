﻿using MealPlan.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MealPlan.Database.Contexts;

public class MealPlanContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
{
    public MealPlanContext(DbContextOptions<MealPlanContext> options)
        :base(options)
    { }
}